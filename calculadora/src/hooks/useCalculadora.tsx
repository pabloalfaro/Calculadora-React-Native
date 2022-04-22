import { useRef, useState } from 'react';

enum Operadores {
  suma,
  resta,
  multiplicacion,
  division,
}

export const useCalculadora = () => {
  const [numero, setNumero] = useState('0');
  const [numeroAnterior, setNumeroAnterior] = useState('0');

  const ultimaOperacion = useRef<Operadores>();

  const numeroValor = useRef('0');

  const limpiar = () => {
    numeroValor.current = '0';
    if (numero === '0') {
      setNumeroAnterior('0');
    } else {
      setNumero('0');
    }
  };

  const montarNumero = (numeroTexto: string) => {
    // Duplicidad de puntos
    if (numero.includes('.') && numeroTexto === '.') return;

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      // Punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);
        // 0s depués de punto decimal
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);
        //sustituir el primer 0 al poner otro numero
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        if (numero.startsWith('-')) {
          setNumero('-' + numeroTexto);
        } else {
          setNumero(numeroTexto);
        }
        // Eliminar duplicidad de 0s iniciales
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const eliminarEntrada = () => {
    if (numero.length === 1) {
      setNumero('0');
    } else if (numero.startsWith('-') && numero.length === 2) {
      setNumero('0');
    } else {
      setNumero(numero.substring(0, numero.length - 1));
    }
  };

  const actualizarNumero = () => {
    // Elimina el punto decimal si el número acaba por él
    if (numeroValor.current.endsWith('.')) {
      setNumeroAnterior(numeroValor.current.slice(0, -1));
      // Elimina los decimales si son sólo 0s
    } else if (
      numeroValor.current.includes('.') &&
      +numeroValor.current.substring(
        numeroValor.current.indexOf('.'),
        numeroValor.current.length
      ) === 0
    ) {
      setNumeroAnterior(numeroValor.current.substring(0, numeroValor.current.indexOf('.')));
      // Actualiza los números de manera general
    } else {
      setNumeroAnterior(numeroValor.current);
    }
    setNumero('0');
  };

  const dividir = () => {
    calcular();
    actualizarNumero();
    ultimaOperacion.current = Operadores.division;
  };

  const multiplicar = () => {
    calcular();
    actualizarNumero();
    ultimaOperacion.current = Operadores.multiplicacion;
  };

  const sumar = () => {
    calcular();
    actualizarNumero();
    ultimaOperacion.current = Operadores.suma;
  };

  const restar = () => {
    calcular();
    actualizarNumero();
    ultimaOperacion.current = Operadores.resta;
  };

  const calcular = () => {
    const op1 = +numero;
    const op2 = +numeroAnterior;
    switch (ultimaOperacion.current) {
      case Operadores.suma:
        numeroValor.current = (op2 + op1).toString();
        setNumero(numeroValor.current);
        break;
      case Operadores.resta:
        setNumero((op2 - op1).toString());
        break;
      case Operadores.multiplicacion:
        setNumero((op1 * op2).toString());
        break;
      case Operadores.division:
        setNumero((op2 / op1).toString());
        break;
      default:
        break;
    }
    setNumeroAnterior('0');
  };

  return {
    numero,
    numeroAnterior,
    limpiar,
    positivoNegativo,
    eliminarEntrada,
    dividir,
    montarNumero,
    multiplicar,
    restar,
    sumar,
    calcular,
  };
};
