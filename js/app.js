
// variables
const yearsTable = document.getElementById('anio')
const maxYear = new Date().getFullYear(), minYear = maxYear - 20
const form = document.getElementById('cotizar-seguro')

class Insurance {
    constructor (brandId, year, typeValue) {
        this.brand = brands.find(b => b.id == brandId)
        console.log(this.brand)
        this.year = year
        this.type = types.find(t => t.type == typeValue)
    }
    calculateTotalAmount() {
        const partialAmount = this.brand.price * getYearPercentage(this.year)
        const totalAmount = this.type.calculate(partialAmount)
        return totalAmount
    }
    getDescriptionDiv() {
        return `<p class='header'>Tu Resumen: </p>
        <p>Marca: ${this.brand.brand} </p>
        <p>Precio base: ${this.brand.price} </p>
        <p>Año: ${this.year} (${getYearPercentage(this.year)})</p>
        <p>Tipo: ${this.type.type} </p>
        <p>Total: $ ${this.calculateTotalAmount()} </p>`
    }
}

class Type {
    constructor(type, percentage) {
        this.type = type
        this.percentage = percentage
    }
    calculate(amount) {
        return getPercentageMultiplier(this.percentage) * amount
    }
}
 
class Brand {
    constructor(brand, price, id) {
        this.brand = brand
        this.price = price
        this.id = id
    }
}

// object constant instances 

//Types
const basic = new Type('basico', 25)
const complete = new Type('completo', 50)

//Brands
const american = new Brand('American', 8000, 1)
const asian = new Brand('Asian', 5000, 2)
const european = new Brand('European', 6000, 3)

const brands = [american, asian, european]
const types = [basic, complete]



for (let i = maxYear; i >= minYear; i--) {
    const option = document.createElement('option')
    option.value = i;
    option.innerHTML = i;
    yearsTable.appendChild(option)
}

// event listeners

form.addEventListener('submit', function(e) {
    e.preventDefault
    const brand = getFormBrand()
    const type = getFormType()
    const year = getFormYear()
    const insurance = new Insurance(brand.value, year, type)
    const div = document.createElement('div');

    div.innerHTML = insurance.getDescriptionDiv()

    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(function() {
         spinner.style.display = 'none';
         resultado.appendChild(div);
    }, 3000);
})

// functions 

function calculateTotalAmount(brandId, typeValue, year) {
    const brand = brands.find(b => b.id == brandId)
    const type = types.find(t => t.type == typeValue)
    const partialAmount = brand.price * getYearPercentage(year)
    const totalAmount = type.calculate(partialAmount)
}

function getYearPercentage(year) {
    const start = 1
    const now = new Date().getFullYear()
    const yearPercentage = (now - year) * 3
    const finalMultiplier = getPercentageMultiplier(yearPercentage)
    console.log(`${finalMultiplier} %`)
    return finalMultiplier;
} 

function getPercentageMultiplier(percentage) {
    return (percentage / 100) + 1;
}

function getFormBrand() {
    const brand = document.getElementById('marca')
    return brand.options[brand.selectedIndex]
}

function getFormType() {
    return document.querySelector('input[name="tipo"]:checked').value
}

function getFormYear() {
    return document.getElementById('anio').value
}

