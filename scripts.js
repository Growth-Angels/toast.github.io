class Toast {
  constructor(toast) {
    this.toast = toast
    this.originalTemplate = toast.innerHTML
    this.timings = [3000, 6000]
    this.randomTiming = this.timings[Math.floor(Math.random() * this.timings.length)]
    this.variables = {
      type_de_demande: ['Déclaration préalable de travaux', 'Permis de construire'],
      type_de_travaux: ['Garage', 'Maison', "Buanderie", 'Extension', 'Jardin', 'Cloture'],
      person: ['Mme Ducros', 'Mr Patate', 'Mme Doué', 'Mr Gentil', 'Mr Grognon'],
      city: ['Lyon', 'Marseille', 'Paris', 'Nantes', 'Lille', 'Saint-Marcel-les-valence'],
    }

    this.timeout = null
    this.interval = null
  }

  generateRandomTiming() {
    return Math.floor(Math.random() * (this.timings[1] - this.timings[0] + 100)) + this.timings[0]
  }

  displayToast() {
    this.toast.classList.remove('close')
    // auto close
    this.interval = setTimeout(() => {
      this.closeToast()
    }, 3000)
  }

  closeToast() {
    this.toast.classList.add('close')
    // refresh
    setTimeout(() => {
      this.refreshState()
      this.displayToast()
    }, this.generateRandomTiming())
  }

  pauseClosing = () => {
    clearTimeout(this.interval)
  }

  refreshState() {
    let newHtml = this.originalTemplate
    for (const [key, value] of Object.entries(this.variables)) {
      const regex = new RegExp(`{${key}}`, 'g')
      const index = Math.floor(Math.random() * value.length)
      newHtml = newHtml.replace(regex, value[index])
    }
    this.toast.innerHTML = newHtml
  }


  onMount() {
    this.refreshState()
    setTimeout(() => {
      this.displayToast()
    }, this.generateRandomTiming())
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toast = document.querySelector('.toast')

  const toastInstance = new Toast(toast)
  toastInstance.onMount()

  toast.addEventListener('mouseenter', () => {
    toastInstance.pauseClosing()
  })

  toast.addEventListener('mouseleave', () => {
    toastInstance.closeToast()
  })
})