const input = document.getElementById('input')
const copyInput = document.getElementById('result')
const main = document.querySelector('main')

//Adquirindo o atributo "root" do CSS presente no projeto para posterior mudança de temas:
const root = document.querySelector(':root')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

input.addEventListener('keydown', function(event) {
    event.preventDefault()
    //Validando as entradas do input:
    if(allowedKeys.includes(event.key)){
        input.value += event.key
        return input
    }
    //Implementando a funcionalidade de apagar caracteres do input pelo teclado:
    if (event.key === 'Backspace') {
        input.value = input.value.slice(0, -1)
    }
    //Implementando a funcionalidade de calcular a expressão do input pelo teclado:
    if (event.key === 'Enter') {
        calculate()
    }
})

//Adicionando eventos nos botões da calculadora:
document.querySelectorAll('.charKey').forEach(function(key) {
    key.addEventListener('click', function() {
        input.value += key.dataset.value
    })
})

//Adicionando a funcionalidade de limpar o input:
document.getElementById('clear').addEventListener('click', function() {
    input.value = ''
    //Focando no input quando ele é limpo:
    input.focus()
    if (copyInput.value === "ERROR") {
        //Limpando o valor no input de copiar caso tenha resultado em erro:
        copyInput.value = ""

        //Retirando a classe de estilização de error:
        copyInput.classList.remove('error')
    }
})

//Adicionando a funcionalidade de calcular a expressão pelo botão de igualdade:
document.getElementById('equal').addEventListener('click', calculate)

//Adicionando a funcionalidade de copiar para a área de transferência:
document.getElementById('copyToClipboard').addEventListener('click', function(event) {
    const copyBtn = event.currentTarget
    if (copyBtn.innerText === "Copy") {
        copyBtn.innerText = "Copied!"
        //Adicionando uma nova classe (que está presente no arquivo CSS deste projeto) para mudar a estilização:
        copyBtn.classList.add('success')
        //Atribuindo a funcionalidade de copiar para a área de transferência:
        navigator.clipboard.writeText(copyInput.value)
    } else {
        //Retirando a estilização de "Copied":
        copyBtn.innerText = "Copy"
        copyBtn.classList.remove('success')
    }
})

//Calcula a expressão inserida no input da calculadora:
function calculate() {
    //Validando a expressão para o caso de ser incorreta:
    copyInput.value = 'ERROR'
    //Classe de estilização "error" presente no arquivo CSS deste projeto:
    copyInput.classList.add('error')

    //Calculando o valor de fato:
    const result = eval(input.value)

    //Atribuindo o valor no input de copiar:
    copyInput.value = result

    //Retirando a classe de estilização de error caso não tenha:
    copyInput.classList.remove('error')
}

//Adicionando a funcionalidade de troca de temas:
document.getElementById('themeSwitcher').addEventListener('click', function() {
    //Verificação de qual tema está sendo exibido:
    if (main.dataset.theme === 'dark') {
        //Mudando o atributo "root" do CSS presente no projeto:
        root.style.setProperty("--bg-color", "#f1f5f9")
        root.style.setProperty("--border-color", "#aaa")
        root.style.setProperty("--font-color", "#212529")
        root.style.setProperty("--primary-color", "#26834a")
        main.dataset.theme = "light"
    } else {
        root.style.setProperty("--bg-color", "#212529")
        root.style.setProperty("--border-color", "#666")
        root.style.setProperty("--font-color", "#f1f5f9")
        root.style.setProperty("--primary-color", "#4dff91")
        main.dataset.theme = "dark"
    }
})
