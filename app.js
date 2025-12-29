class ProductViewer {

    #mediumImage
    #largeImage
    #largeImageSRC
    #thumbnailWrapper
    #zoomElement

    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.#mediumImage = element.querySelector('.js-image-medium')
        this.#thumbnailWrapper = element.querySelector('.js-images')
        this.#zoomElement = element.querySelector('.js-zoom')
        this.#largeImage = element.querySelector('.js-image-large')


        const links = this.#thumbnailWrapper.querySelectorAll('a')
        this.#largeImageSRC = links[0].getAttribute('href')
        for (const link of links) {
            link.addEventListener('click', this.#onThumbnailClick.bind(this))
        }
            this.#mediumImage.addEventListener('mouseenter', this.#onEnter.bind(this))
            this.#mediumImage.addEventListener('mouseleave', this.#onLeave.bind(this))

    }

    /**
     * 
     * @param {PointerEvent} e 
     */

    #onThumbnailClick (e) {
        e.preventDefault()
        this.#thumbnailWrapper.querySelector('.active')?.classList.remove('active')
        e.currentTarget.classList.add('active')
        const medium = e.currentTarget.dataset.medium
        this.#mediumImage.src = medium
        this.#largeImageSRC = e.currentTarget.getAttribute('href')
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    #onEnter (e) { 
        this.#zoomElement.classList.add('active')
        const rect = this.#mediumImage.getBoundingClientRect()
        this.#largeImage.setAttribute('src', this.#largeImageSRC)
        this.#zoomElement.style.setProperty('--left', `${rect.x + rect.width}px`)
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    #onLeave (e) { 
        this.#zoomElement.classList.remove('active')
    }

}

document.querySelectorAll('.js-product').forEach(el => new ProductViewer(el))