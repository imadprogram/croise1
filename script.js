const newworker = document.getElementById('newworker')
const formbg = document.getElementById('form-bg')
const form = document.getElementById('form')
const inputs = document.querySelectorAll('.input')


newworker.addEventListener('click', () => {
    formbg.classList.remove('hidden')
})

formbg.addEventListener('click', () => {
    formbg.classList.add('hidden')
    inputs.forEach(input => {
        input.value = ''
    })
})

form.addEventListener('click', (e) => {
    e.stopPropagation()
})


const workers = [
    // {
    //     fullname: 'imad',
    //     job: 'Manager',
    // },
    // {
    //     fullname: 'ahmed',
    //     job: 'cleaner',
    // },
    // {
    //     fullname: 'simo',
    //     job: 'other',
    // }
]

const workersSide = document.getElementById('workers-container')


// workers.forEach(worker => {
//     workersSide.innerHTML += `
//             <div class="flex w-[90%] h-15 rounded-lg [box-shadow:0_10px_20px_rgba(0,0,0,.3)] gap-4 items-center px-3">
//                 <img src="img/ground.jpg" alt="" class="rounded-full w-10 h-10">
//                 <div>
//                     <h2 class="font-bold">${worker.fullname}</h2>
//                     <p class="text-sm text-gray-500">${worker.job}</p>
//                 </div>
//             </div>
//     `
// })

const addex = document.getElementById('addex')
const dynamic = document.querySelector('.dynamic')
const exForm = document.querySelector('.experience-form')

addex.addEventListener('click', (e) => {
    e.preventDefault()
    let newform = exForm.cloneNode(true)

    let inputs = newform.querySelectorAll('input')
    inputs.forEach(input => {
        input.value = ''
    }
    )
    dynamic.appendChild(newform)
})


const addworker = document.getElementById('addworker')


form.addEventListener('submit', (e) => {


    if (nameValidation() && emailValidation() && numberValidation()) {
        formbg.classList.add('hidden')
        Toastify({
            text: "new worker added",
            duration: 3000,
            gravity: "top",
            position: "center"
        }).showToast();


        let obj = {}

        inputs.forEach(input => {
            obj[input.name] = input.value;
            input.value = ''
        })

        workers.push(obj)
        console.log(workers)

        workersSide.innerHTML = ''
        workers.forEach(worker => {
            workersSide.innerHTML += `
            <div class="flex w-[90%] h-15 rounded-lg [box-shadow:0_10px_20px_rgba(0,0,0,.3)] gap-4 items-center px-3">
                <img src="img/ground.jpg" alt="" class="rounded-full w-10 h-10">
                <div>
                    <h2 class="font-bold">${worker.fullname}</h2>
                    <p class="text-sm text-gray-500">${worker.job}</p>
                </div>
            </div>
            `

            formbg.querySelectorAll('input').forEach(field => {
                field.value = ''
            })

            // dynamic.removeChild(newform)
        })


    } else {
        alert('false')
    }
    e.preventDefault()


})

const urlinput = document.getElementById('urlpreview')

const preview = document.getElementById('preview-img')

// preview pfp of the form
urlinput.addEventListener('change', () => {
    preview.src = `${urlinput.value}`
})


// form validation

function nameValidation() {
    const fullname = form.querySelector('#fullname').value.trim()
    const namevalid = /^[a-zA-Z]{2,}$/g

    if (namevalid.test(fullname)) {
        // form.querySelector('#fullname').classList.add('bg-red-400')
        return true
    }

}
function emailValidation() {
    const email = form.querySelector('#email').value.trim()
    const emailvalid = /[a-zA-Z|0-9]+@[a-zA-Z]{5,}.[a-z]{2,}/g

    if (emailvalid.test(email)) return true

}
function numberValidation() {
    const number = form.querySelector('#number').value.trim()
    const numberValid = /\+(212)(5|6|7)[0-9]{8}/g

    if (numberValid.test(number)) return true
}
// function experienceValidation(){
//     const fromdate = exForm.querySelector('.from').value
//     console.log(fromdate)
// }