class ProductViewer {

    #mediumImage
    #thumbnailWrapper

    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.#mediumImage = element.querySelector('.js-image-medium')
        this.#thumbnailWrapper = element.querySelector('.js-images')
        const links = this.#thumbnailWrapper.querySelectorAll('a')
        for (const link of links) {
            link.addEventListener('click', this.#onThumbnailClick.bind(this))
        }
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

}

document.querySelectorAll('.js-product').forEach(el => new ProductViewer(el))