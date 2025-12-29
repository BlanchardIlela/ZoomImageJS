class ProductViewer {

    #mediumImage
    #largeImage
    #largeImageSRC
    #thumbnailWrapper
    #zoomElement
    #magnifier

    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.#mediumImage = element.querySelector('.js-image-medium')
        this.#thumbnailWrapper = element.querySelector('.js-images')
        this.#zoomElement = element.querySelector('.js-zoom')
        this.#largeImage = element.querySelector('.js-image-large')
        this.#magnifier = element.querySelector('.js-magnifier')

        const links = this.#thumbnailWrapper.querySelectorAll('a')
        this.#largeImageSRC = links[0].getAttribute('href')
        for (const link of links) {
            link.addEventListener('click', this.#onThumbnailClick.bind(this))
        }
            this.#mediumImage.addEventListener('mouseenter', this.#onEnter.bind(this))
            this.#mediumImage.addEventListener('mouseleave', this.#onLeave.bind(this))
            this.#mediumImage.addEventListener('mousemove', this.#onMove.bind(this))
            this.#largeImage.addEventListener('load', this.#updateRatio.bind(this))
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

    /**
     * 
     * @param {PointerEvent} e 
     */
    #onMove (e) { 
        this.#magnifier.style.setProperty(
            'transform',
            `translate3d(${e.offsetX}px, ${e.offsetY}px, 0)`
        )
       console.log(
        e.offsetX / this.#mediumImage.width, 
        e.offsetY / this.#mediumImage.height
        )
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    #updateRatio (e) {
        const zoomReact = this.#zoomElement.getBoundingClientRect()
        const ratio = {
            width: zoomReact.width / this.#largeImage.width,
            height: zoomReact.height / this.#largeImage.height
        }
        this.#magnifier.style.setProperty('width', `${ratio.width * 100}%`)
        this.#magnifier.style.setProperty('height', `${ratio.height * 100}%`)
    }

}

document.querySelectorAll('.js-product').forEach(el => new ProductViewer(el))