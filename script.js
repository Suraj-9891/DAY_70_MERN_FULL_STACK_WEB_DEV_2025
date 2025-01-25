const textDisplay = document.getElementById('textDisplay');
const keyboard = document.getElementById('keyboard');
const caseToggle = document.getElementById('caseToggle');

let isUpperCase = false;

// Key layout
const keys = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
    'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
    '+', '-', '=', '_', '?', ':', '[', ']', '{', '}', '|',
    '~', '`', '§', '£', '¥',
    '@', '#', '$', '%', '^', '&', '*', '(', ')', '!',
    'Space', 'Tag' , 'Tab', 'Enter',

];

// Generate keys
function renderKeys() {
    keyboard.innerHTML = '';
    keys.forEach(key => {
        const keyElement = document.createElement('button');
        keyElement.classList.add('key');
        keyElement.textContent = key === 'Space' ? '␣' : key === 'Tag' ? '<>' : isUpperCase ? key.toUpperCase() : key;
        keyElement.addEventListener('click', () => {
            if (key === 'Space') {
                textDisplay.value += ' ';
            } else if (key === 'Tag') {
                textDisplay.value += '<>'; // Placeholder for HTML tags
            } else if (key === 'Tab') {
                textDisplay.value += '\t';
            } else if (key === 'Enter') {
                textDisplay.value += '\n';
            } else {
                textDisplay.value += keyElement.textContent;
            }
        });
        keyboard.appendChild(keyElement);
    });
}

renderKeys();

// Controls functionality
document.getElementById('send').addEventListener('click', () => {
    alert(`Sending: ${textDisplay.value}`);
});

document.getElementById('search').addEventListener('click', () => {
    alert(`Searching for: ${textDisplay.value}`);
});

document.getElementById('undo').addEventListener('click', () => {
    textDisplay.value = textDisplay.value.slice(0, -1);
});

document.getElementById('redo').addEventListener('click', () => {
    // Basic redo functionality placeholder
    alert('Redo functionality not implemented.');
});

document.getElementById('delete').addEventListener('click', () => {
    textDisplay.value = '';
});

document.getElementById('copy').addEventListener('click', () => {
    textDisplay.select();
    document.execCommand('copy');
    alert('Text copied to clipboard!');
});

caseToggle.addEventListener('click', () => {
    isUpperCase = !isUpperCase;
    renderKeys();
});

// Enable typing via laptop keyboard
textDisplay.addEventListener('keydown', (e) => {
    e.preventDefault(); // Prevent default behavior to avoid duplicate inputs

    if (e.key === 'Backspace') {
        textDisplay.value = textDisplay.value.slice(0, -1);
    } else if (e.key.length === 1) {
        textDisplay.value += e.key;

        // Highlight the corresponding virtual key
        const matchingKey = Array.from(document.querySelectorAll('.key')).find(key => key.textContent.toLowerCase() === e.key.toLowerCase() || (key.textContent === '␣' && e.key === ' '));
        if (matchingKey) {
            matchingKey.classList.add('hovered');
            setTimeout(() => matchingKey.classList.remove('hovered'), 200);
        }
    }
});