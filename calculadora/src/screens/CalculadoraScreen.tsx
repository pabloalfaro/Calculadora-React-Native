import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../theme/appTheme';
import { Boton } from '../components/Boton';
import { useCalculadora } from '../hooks/useCalculadora';

export const CalculadoraScreen = () => {
  const {
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
  } = useCalculadora();

  return (
    <View style={styles.calculadoraContainer}>
      <Text style={styles.resultadoPeque}>
        {numeroAnterior === '0' || numeroAnterior === '-0' ? '' : numeroAnterior}
      </Text>
      <Text style={styles.resultado} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>

      {/* Fila 1 */}
      <View style={styles.fila}>
        <Boton texto="C" tipo="opcion" accion={limpiar} />
        <Boton texto="+/-" tipo="opcion" accion={positivoNegativo} />
        <Boton texto="%" tipo="opcion" accion={eliminarEntrada} />
        <Boton texto="/" tipo="operacion" accion={dividir} />
      </View>

      {/* Fila 2 */}
      <View style={styles.fila}>
        <Boton texto="7" tipo="numero" accion={montarNumero} />
        <Boton texto="8" tipo="numero" accion={montarNumero} />
        <Boton texto="9" tipo="numero" accion={montarNumero} />
        <Boton texto="X" tipo="operacion" accion={multiplicar} />
      </View>

      {/* Fila 2 */}
      <View style={styles.fila}>
        <Boton texto="4" tipo="numero" accion={montarNumero} />
        <Boton texto="5" tipo="numero" accion={montarNumero} />
        <Boton texto="6" tipo="numero" accion={montarNumero} />
        <Boton texto="-" tipo="operacion" accion={restar} />
      </View>

      {/* Fila 3 */}
      <View style={styles.fila}>
        <Boton texto="1" tipo="numero" accion={montarNumero} />
        <Boton texto="2" tipo="numero" accion={montarNumero} />
        <Boton texto="3" tipo="numero" accion={montarNumero} />
        <Boton texto="+" tipo="operacion" accion={sumar} />
      </View>

      {/* Fila 4 */}
      <View style={styles.fila}>
        <Boton texto="0" tipo="numero" tamano="doble" accion={montarNumero} />
        <Boton texto="." tipo="numero" accion={montarNumero} />
        <Boton texto="=" tipo="operacion" accion={calcular} />
      </View>
    </View>
  );
};
