# prompt-writer
A text / prompt writer simulatier with configurations and written in ES2015

A couple of hours trying out some of the new ES2015 features.
If you want to include it in your project, here's the configuration layout:

**Required**: element, provide it an element
```
element: document.getElementById('text-prompt')
```

**Required**: text, an array of strings, minimum is a single string
```
text: ['The quick brown fox...', 'jumps over...', 'the lazy dog.']
```

**Optional**: Duration before the text starts writing, in ms
```
addDelay: 0
```

**Optional**: How fast each letter is added, in ms
```
addSpeed: 10
```

**Optional**: Somewhat simulate human typing by varying the speed (by a +/- variance), in ms
```
speedVariance: 150
```

**Optional**: Delay deleting before erasing, in ms
```
deleteDelay: 1500
```

**Optional**: How fast each letter is removed, in ms
```
deleteSpeed: 50
```

**Optional**: Infinite loop
```
loopInfinitely: true
```

**Optional**: Character to use for the cursor: `|` and `_` are great
```
cursorCharacter: '|'
```
