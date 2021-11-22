/**
  mecatron.js
  Controlador principal del juego Mecatron 3000
  @author Juanjo Carrasco
  @license GPL v3 2021
*/

'use strict'

/**
  Controlador principal del juego
*/

class Juego{
  constructor(){
    this.vista = new Vista()
    this.modelo = new Modelo()
    this.generadorPalabras = null
    this.animador = null
    this.divPrincipal = null
    window.onload = this.iniciar.bind(this)
  }
  iniciar(){
    console.log('Iniciando...')
    this.divPrincipal = document.getElementById('divPrincipal')
    this.vista.div = this.divPrincipal
    this.generadorPalabras = window.setInterval(this.generarPalabra.bind(this), 1000)
    this.animador = window.setInterval(this.vista.moverPalabras.bind(this.vista), 100)
    window.onkeypress = this.pulsar.bind(this)
  }
  generarPalabra(){
    let nuevaPalabra = this.modelo.crearPalabra()
    this.vista.dibujar(nuevaPalabra)
  }
  pulsar(evento){
    let letraPulsada = evento.key
    //console.log(`Has pulsado ${letraPulsada}`)
    //Busco todas las palabras
    let palabras = this.divPrincipal.querySelectorAll('.palabra')
    //Para cada palabra, aumento atributo top
    for(let palabra of palabras){
      let span = palabra.children.item(0)
      let nodoTexto = palabra.childNodes[1]
      let textoRestante = nodoTexto.nodeValue
      let primeraLetraTextoRestante = textoRestante.charAt(0)
      if(letraPulsada == primeraLetraTextoRestante){
        span.textContent += letraPulsada
        nodoTexto.nodeValue = textoRestante.substring(1)

        //Si ha completado la palabra, la quito y sumo puntos
        if(nodoTexto.nodeValue.length == 0){
          palabra.remove()
          this.modelo.sumarpPunto()
        }
      }
      else{
        //Ha fallado, repongo el texto de la palabra
        nodoTexto.nodeValue = span.textContent + textoRestante
        span.textContent = null
      }
    }
  }
}

/**
Clase Vista que muestra el juego.
*/

class Vista{
  constructor(){
    this.div = null //Div donde se desarrolla el juego
  }
  /**
  Dibuja el area de Juego
  @param palabra {String} La nueva palabra.
  */
  dibujar(palabra){
    //<div class="palabra">Meca</div>
    let div = document.createElement('div')
    this.div.appendChild(div)
    let span = document.createElement('span')
    div.appendChild(span)
    div.appendChild(document.createTextNode(palabra))
    div.classList.add('palabra')
    div.style.top = '0px'
    div.style.left = Math.floor(Math.random() * 85) + '%'
  }
  /**
    Mueve las palabras del juego.
  */
  moverPalabras(){
    //Busco todas las palabras del divPrincipal
    let palabras = this.div.querySelectorAll('.palabra')

    //Para cada palabra, aumento atributo top
    for(let palabra of palabras){
      let top = parseInt(palabra.style.top)
      top+=5
      palabra.style.top = `${top}px`
      //Si llegan al suelo, se borran
      if(parseInt(palabra.style.top)>580){
        palabra.remove()
      }
    }
  }
}

class Modelo{
  constructor(){
        this.palabras = ['En', 'un', 'lugar', 'de', 'la', 'Mancha']
  }
  /**
    Devuelve una palabra
    Devuelve aleatoriamente un elemento del array de palabras
    @return {String} Palabra generada
  */
  crearPalabra(){
    return this.palabras[Math.floor(Math.random()* this.palabras.length)]
  }

}

var app = new Juego()
