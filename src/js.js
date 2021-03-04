function constantes(){ 
const celeste = document.getElementById("celeste")
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const btnNivel1 = document.getElementById("uno")
const btnNivel2 = document.getElementById("dos")
const btnNivel3 = document.getElementById("tres")
const btnNivel4 = document.getElementById("cuatro")
}
class Juego {
    constructor(dif) {

          this.inicializar = this.inicializar.bind(this)
          this.inicializar(dif)
          this.generarSecuencia()
          setTimeout(()=> this.siguienteNivel(),1000)

        }

    inicializar(dif) {

          this.ULTIMO_NIVEL = dif

          this.siguienteNivel = this.siguienteNivel.bind(this)
          this.elegirColor = this.elegirColor.bind(this)

          this.nivel = 1;
          this.colores = {
              celeste,
              violeta,
              naranja,  
              verde 
            };  
    }
    dificultad(){
      divniveles.classList.remove('visibilidad')
       
    }

    generarSecuencia(){
        this.secuencia = new Array(this.ULTIMO_NIVEL).fill(0).map(function(n){
        return parseInt(Math.random()*4)
    })
    console.log(this.secuencia)
    } 

    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick();
    }

    transformarNumeroAColor(num){
        switch(num){
            case 0:
                return celeste
            case 1: 
                return violeta
            case 2: 
                return naranja
            case 3:
                return verde
        }
    }
    transformarColorANumero(color){
        switch(color){
            case 'celeste':
                return 0
            case 'violeta': 
                return 1
            case 'naranja': 
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarColor(color){
       color.classList.add('light')
       setTimeout(() => this.apagaColor(color), 200 )
        
    }

   

    apagaColor(color){
       color.classList.remove('light')
    }

    iluminarSecuencia(){
        for (let i = 0; i <this.nivel;  i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            console.log(color)
            setTimeout(()=> this.iluminarColor(color),1000 * i)
        }
    console.log(`nivel: ${this.nivel}`)
    }

    agregarEventosClick(){
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)

    }
    
    elegirColor(ev) {
        const nc = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nc)
        const nombreColor = this.transformarNumeroAColor(numeroColor)
        this.iluminarColor(nombreColor)

        if (numeroColor === this.secuencia[this.subnivel]) {
          this.subnivel++
          if (this.subnivel === this.nivel) {
            this.nivel++
            this.eliminarEventosClick()
            if (this.nivel === (this.ULTIMO_NIVEL + 1)) {
              this.ganoElJuego()
            } else {
              setTimeout(this.siguienteNivel, 1500)
            }
          }
        } else {
          this.perdioElJuego()
        }
      }

      ganoElJuego() {
        swal('Muy Bien', 'Felicitaciones, ganaste el juego!', 'success')
        .then(() => {
          this.eliminarEventosClick()
          location.reload();
          
        })
      }

      perdioElJuego() {
        swal('AHHHH :(', 'Lo lamentamos, perdiste :(', 'error')
          .then(() => {
            this.eliminarEventosClick()
            location.reload();
            
          })
      }

    }

function empezarJuego(dif) {
    
    window.juego = new Juego(dif)
}
    
