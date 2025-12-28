class ProductViewer {

    #mediumImage
    #largeImage
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
        for (const link of links) {
            link.addEventListener('click', this.#onThumbnailClick.bind(this))
        }
        element.querySelector('.js-image-medium')
            .addEventListener('mouseenter', this.#onEnter.bind(this))
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
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    #onEnter (e) { 
        this.#zoomElement.classList.add('active')
        const rect = this.#mediumImage.getBoundingClientRect()
        this.#zoomElement.style.setProperty('--left', `${rect.x + rect.width}px`)
    }

}

document.querySelectorAll('.js-product').forEach(el => new ProductViewer(el))