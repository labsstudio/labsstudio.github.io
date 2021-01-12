const $ = document.querySelector.bind(document)
const menuItems = document.querySelectorAll('.nav-menu a[href^="#"]')

let isSpy = true
let section = 'inicio'

document.addEventListener("DOMContentLoaded", () => {
    (function scrollSpy() {
        const targets = document.querySelectorAll(".bloco"),
            options = {
                threshold: 0.5
            }
        // check if IntersectionObserver is supported
        if ("IntersectionObserver" in window) {
            (() => {
                const inView = target => {
                    const interSecObs = new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            const elem = entry.target;
                            let currentNav = document.querySelector(`.nav-menu a[href='#${elem.id}']`)
                            if (entry.isIntersecting) {
                                currentNav.classList.add("selected")
                                if (isSpy) {
                                    window.location.href = window.location.href.replace(/#(\D+)/g, `#${elem.id}`)
                                    menuSectionSelected()
                                } else {
                                    setTimeout(() => {
                                        if (!isSpy) {
                                            isSpy = true
                                        }
                                    }, 500)
                                }
                            } else {
                                currentNav.classList.remove("selected")
                            }
                        })
                    }, options)
                    interSecObs.observe(target)
                }
                targets.forEach(inView)
            })()
        }
    })()
})

function menuToggle (event) {
    if (event) {
        isSpy = false
        menuSectionSelected()
    }
    $('#navbar').classList.toggle('is-open')
    $('#menu').classList.toggle('is-open')

    if ($('#nav-menu')) {
        $('#nav-menu').classList.toggle('is-open')
    }
}

function menuSectionSelected () {
    setTimeout(() => {
        const style = window.location.href.match(/#(\D+)/g)[0].replace('#', '')
    
        $('#menu').classList.remove(section)
        $('#menu').classList.add(style)
    
        section = style

        $('.active').classList.remove('active')
        $(`#${section}`).classList.add('active')

        $('#next-section').setAttribute('href', nextSection())
    }, 100)
}

function slideInfo (event) {
    if (event.type === 'mouseover') {
        $(`p[data-id='${event.target.id}']`).classList.add('show')
        $('.slider-tip').classList.add('hide')
    } else {
        $(`p[data-id='${event.target.id}']`).classList.remove('show')
        $('.slider-tip').classList.remove('hide')
    }
}

function nextSection () {
    const section = window.location.href.match(/#(\D+)/g)[0]

    const sections = []
    menuItems.forEach(item => {
        sections.push(item.getAttribute('href'))
    })

    const sectionId = sections.indexOf(section) + 1
    
    return sections[sectionId]
}

menuItems.forEach(item => {
    item.addEventListener('click', menuToggle)
})
$('#next-section').addEventListener('click', function() {
    isSpy = false
    menuSectionSelected()
})

document.querySelectorAll('.square').forEach(item => {

    item.addEventListener('mouseover', slideInfo)
    item.addEventListener('mouseout', slideInfo)
})

new Glider(document.querySelector('.glider'), {
    slidesToShow: 1,
    slidesToScroll: 1,
    // draggable: true,
    // dots: '#glider-dots',
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    },
    rewind: true,
    scrollLock: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      /* {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, */
    ]

})
