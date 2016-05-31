class TextWriter {

    constructor( config ) {

        // Private
        this._textIndexFirst = 0;
        this._textIndexCurr  = 0;
        this._textIndexLast  = config.text.length - 1;

        // Public
        this.element         = config.element;
        this.addDelay        = config.addDelay        || 1000;
        this.addSpeed        = config.addSpeed        || 100;
        this.speedVariance   = config.speedVariance   || 0;
        this.deleteDelay     = config.deleteDelay     || 1000;
        this.deleteSpeed     = config.deleteSpeed     || 50;
        this.loopInfinitely  = config.loopInfinitely  || true;
        this.endPoint        = config.endPoint        || 'end';
        this.cursorCharacter = config.cursorCharacter || '|';
        this.text            = config.text;

        // Require a DOM node type
        if ( !this.element ) {
            throw new Error('An element is required');
        }

        // Require a string
        if ( !this.text ) {
            throw new Error('Text is required');
        }

        this.element.innerHTML = `
            <span class="text-fill"></span>
            <span class="text-fill-cursor${ !!this.addDelay ? ' text-fill-cursor--animate' : '' }">
                ${ this.cursorCharacter }
            </span>`;

        this.textLength = this.text[ this._textIndexFirst ].length;
        this.counter    = 0;

        // If there's a waiting time
        setTimeout(
            () => {
                if ( this.addDelay ) {
                    this.removeClass( ' text-fill-cursor--animate' );
                }
                this.addTextToElement(
                    this.element.children[0],
                    this.text[ this._textIndexCurr ].split(''),
                    this.counter,
                    this.calculateSpeed( this.addSpeed, this.speedVariance )
                );
            },
            this.addDelay
        );

    }

    /**
     * Add a class from the cursor element
     * @param  {string} className The class name to add
     */
    addClass( className ) {
        this.element.children[1].className += className;
    }

    /**
     * Remove a class from the cursor element
     * @param  {string} className The class name to add
     */
    removeClass( className ) {
        this.element.children[1].className = this.element.children[1].className.replace( className, '' );
    }

    /**
     * Returns the set speed or calculates a variance of that base speed
     * @param  {number} speed         The base speed to use
     * @param  {number} speedVariance Optional: provide a variance to multioply the base speed by
     * @return {number}               The base or calculated speed
     */
    calculateSpeed( speed, speedVariance ) {

        // Nothing to calculate
        if ( speedVariance === 0 ) {
            return speed;
        }

        return speed + Math.ceil( Math.random() * speedVariance );

    }

    /**
     * Add a letter, used recursively
     * @param  {object} element     The selected element
     * @param  {string} element     The word/sentence to write out
     * @param  {number} counter     The counter / position to remove from, typically the start of the string
     * @param  {number} deleteSpeed The speed in ms to add each letter
     */
    addTextToElement( element, text, counter, speed ) {

        setTimeout( () => {

            // Remove the animation class before adding text
            if ( counter === 0 ) {
                this.removeClass( ' text-fill-cursor--animate' );
            }

            // Add the text node
            // Increment the character counter/index
            element.textContent += text[ counter++ ];

            // Recursively add the next character
            if ( counter < text.length ) {
                this.addTextToElement( element, text, counter, this.calculateSpeed( this.addSpeed, this.speedVariance ) );
            }

            // Animate when it has reached the end
            if ( counter >= text.length ) {
                this.addClass( ' text-fill-cursor--animate' );
            }

            // If the current text is complete and there's instructions to remove the text
            if (
                counter >= text.length &&
                (   this.loopInfinitely ||
                    this._textIndexCurr < this._textIndexLast
                )
            ) {

                this.removeTextFromElement(
                    element,
                    element.textContent.length,
                    this.deleteDelay
                );
            }

        }, speed );

    };

    /**
     * Remove a letter, used recursively
     * @param  {object} element     The selected element
     * @param  {number} counter     The counter / position to remove from, typically the end of the string
     * @param  {number} deleteSpeed The speed in ms to remove each letter
     */
    removeTextFromElement( element, counter, deleteSpeed ) {

        setTimeout( () => {

            // Remove the animation class before removing text
            if ( counter === element.textContent.length ) {
                this.removeClass( ' text-fill-cursor--animate' );
            }

            // Add the text node
            // De-increment the character counter/index
            element.textContent = element.textContent.substring( 0, counter-- );

            // Recursively remove the next character
            if ( counter >= 0 ) {
                this.removeTextFromElement( element, counter, this.deleteSpeed );
            }

            // Animate when it has reached the start
            if ( counter < 0 ) {
                this.addClass( ' text-fill-cursor--animate' );
            }

            // Loop if set to infinitely loop
            if ( counter < 0 &&
                ( this.loopInfinitely ||
                    this._textIndexCurr <= this._textIndexLast
                    )
            ) {

                // If there's more than one message to display
                // Increment the index of which message is the current one
                if (
                    this.text.length > 1 &&
                    this._textIndexCurr < this._textIndexLast
                ) {

                    this._textIndexCurr++;

                // Infinitely looping?
                // The end has been reached, set the current message as the one to display
                } else if (
                    this.text.length > 1 &&
                    this._textIndexCurr >= this._textIndexLast &&
                    this.loopInfinitely
                ) {
                    this._textIndexCurr = 0;
                }

                this.addTextToElement(
                    this.element.children[0],
                    this.text[ this._textIndexCurr ].split(''),
                    0,
                    this.addDelay
                );
            }

        }, deleteSpeed );

    }

}
