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
        let experiences = []

        inputs.forEach(input => {
            obj[input.name] = input.value;
            input.value = ''
        })

        const exforms = document.querySelectorAll('.experience-form')
        exforms.forEach(form => {
            let objex = {}
            form.querySelectorAll('input').forEach(input => {
                objex[input.name] = input.value
            })
            experiences.push(objex)
        })

        obj.experiences = experiences;
        workers.push(obj)
        console.log(workers)

        workersSide.innerHTML = ''
        workers.forEach(worker => {
            workersSide.innerHTML += `
            <div data-id = '${workers.length - 1}' class="worker-box   flex w-[90%] h-15 rounded-lg [box-shadow:0_10px_20px_rgba(0,0,0,.3)] gap-4 items-center px-3">
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
    const emailvalid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

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


workersSide.addEventListener('click', (e) => {
    const box = e.target.closest('.worker-box')
    if (box) {
        const id = box.dataset.id
        const worker = workers[id]
        // console.log(worker)
        const profile = document.createElement('div')
        profile.className = "fixed  h-full w-full flex justify-center items-center bg-[rgba(0,0,0,.6)]"
        profile.innerHTML = `
        <div class="h-[80%] w-[23em] bg-white rounded-lg overflow-y-scroll [scrollbar-width:none]">
            <div id="banner" class="[background-image:url(img/banner.jpg)] bg-cover h-32 relative pl-4">
                <div class="rounded-full w-20 h-20 absolute translate-y-[50%] bottom-0 p-1 bg-white">
                    <img src="${worker.picture}" alt="" class="rounded-full h-full w-full">
                </div>
            </div>
            <div id="infos" class="flex flex-col justify-center pt-12 pl-4 gap-2">
                <h1 class="font-bold text-xl">${worker.fullname}</h1>
                <p class="text-gray-900 bg-gray-200 w-fit px-3 text-[0.7rem] rounded-full py-[0.2rem]"><i class="fa-solid fa-briefcase"></i> ${worker.job}</p>
                <p class="text-gray-900 bg-gray-200 w-fit px-3 text-[0.7rem] rounded-full py-[0.2rem]"><i class="fa-solid fa-envelope"></i> ${worker.email}</p>
                <p class="text-gray-900 bg-gray-200 w-fit px-3 text-[0.7rem] rounded-full py-[0.2rem]"><i class="fa-solid fa-phone"></i> ${worker.number}</p>
                <div class="bg-gray-500 h-[0.05rem] mt-4"></div>
                <div id="experiences-section" class="flex flex-col gap-4">
                    <h1 class="text-lg font-semibold">Experiences</h1>
                    ${worker.experiences.map(exp => `
                        <div class="flex flex-col gap-2">
                        <h2>Job: ${exp.exjob}</h2>
                        <h2>Company: ${exp.company}</h2>
                        <div class="flex gap-10">
                            <h2>From: ${exp.from}</h2>
                            <h2>To: ${exp.to}</h2>
                        </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `
        document.body.appendChild(profile)
    } else {
        return
    }
})