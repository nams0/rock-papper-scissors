const developerSection = document.getElementById("developer")
const developer = developerSection.querySelector("p:nth-child(2)")

let randomChars = "!@#$%^&*()_+-<>?"
let originalText = developer.innerText

const scrambleHandler = () => {
  developer.classList.add("scramble_effect")
  let iterations = 0
  let interval = setInterval(() => {
    developer.innerText = originalText
      .split("")
      .map((char, index) => {
        if (index < iterations) return char
        return randomChars.charAt(
          Math.floor(Math.random() * randomChars.length)
        )
      })
      .join("")
    if (iterations >= originalText.length) {
      developer.classList.remove("scramble_effect")
      clearInterval(interval)
    }
    iterations += 1 / 3
  }, 100)
}

developer.addEventListener("mouseover", scrambleHandler)
