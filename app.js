import { clamp } from "./functions/math.js"

class ProductViewer {

    #mediumImage
    #largeImage
    #largeImageSRC
    #thumbnailWrapper
    #zoomElement
    #magnifier
    #ratio = {width: 1, height: 1}

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
        const cursorRatio = {
            x: e.offsetX / this.#mediumImage.width, 
            y: e.offsetY / this.#mediumImage.height
       }
       const magnifierRactio = {
            x: clamp((cursorRatio.x - this.#ratio.width / 2), 0, 1 - this.#ratio.width),
            y: clamp((cursorRatio.y - this.#ratio.height / 2), 0, 1 - this.#ratio.height)
       }
        this.#magnifier.style.setProperty(
            'transform',
            `translate3d(
                ${magnifierRactio.x * this.#mediumImage.width}px,
                ${magnifierRactio.y * this.#mediumImage.height}px,
                0
            )`
        )
        this.#largeImage.style.setProperty(
            'transform',
            `translate3d(
                -${magnifierRactio.x * 100}%,
                -${magnifierRactio.y * 100}%,
                0
            )`
        )
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    #updateRatio (e) {
        const zoomReact = this.#zoomElement.getBoundingClientRect()
        this.#ratio = {
            width: zoomReact.width / this.#largeImage.width,
            height: zoomReact.height / this.#largeImage.height
        }
        this.#magnifier.style.setProperty('width', `${this.#ratio.width * 100}%`)
        this.#magnifier.style.setProperty('height', `${this.#ratio.height * 100}%`)
    }

}

document.querySelectorAll('.js-product').forEach(el => new ProductViewer(el))