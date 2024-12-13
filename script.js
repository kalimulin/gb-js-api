const getRandomPhoto = async () => {
    const apiKey = 'bYUobyQDLdOYPNY-fi_-XoAh1quJTCAFXww0MG_cb0k'
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${apiKey}`)
        const json = await response.json()
        if (json.id) {
            return json
        }
        console.error('Ошибка при загрузке фотографии')
        return {}
    } catch (error) {
        console.error('Ошибка при загрузке фотографий:', error)
        return {}
    }
}

const renderPhoto = async () => {
    const photo = await getRandomPhoto()
    if (!photo) {
        return
    }

    const imageBox = document.querySelector('.image_box')
    const img = document.createElement('img')
    img.classList.add('image')

    img.src = photo.urls.small
    img.alt = photo.alt_description
    imageBox.appendChild(img)

    const imagePhotographerNameDiv = document.querySelector('.image_photographer-name')
    imagePhotographerNameDiv.textContent = `${photo.user.name}`

    const imageLikesCounterSpan = document.querySelector('.image_likes-counter')
    imageLikesCounterSpan.textContent = `${photo.likes}`
}

const increaseCounter = () => {
    const likesCounter = document.querySelector('.image_likes-counter')
    const currentCounter = parseInt(likesCounter.textContent, 10)
    likesCounter.textContent = currentCounter + 1
}

window.addEventListener('load', () => {
    renderPhoto()
})

const counterButton = document.querySelector('.image_likes-button')

counterButton.addEventListener('click', () => {
    increaseCounter()
})
