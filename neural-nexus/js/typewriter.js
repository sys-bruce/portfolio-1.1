class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.isDeleting = false;
    this.type();
  }

  type() {
    // Current word
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove character
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add character
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial type speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      // Set delete to false
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', initTypewriter);

function initTypewriter() {
  const txtElement = document.querySelector('.typewriter');
  if (txtElement) {
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
  }
}
