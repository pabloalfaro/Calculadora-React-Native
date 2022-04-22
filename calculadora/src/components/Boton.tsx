import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from '../theme/appTheme';

interface Props {
  texto: string;
  tipo: 'operacion' | 'numero' | 'opcion';
  tamano?: 'simple' | 'doble';
  accion: (numeroTexto: string) => void;
}

export const Boton = ({ texto, tipo, tamano = 'simple', accion }: Props) => {
  return (
    <TouchableOpacity onPress={() => accion(texto)}>
      <View style={{ ...styles.boton, ...color[tipo], ...btnTamano[tamano] }}>
        <Text style={{ ...styles.botonTexto, ...colorTexto[tipo] }}>{texto}</Text>
      </View>
    </TouchableOpacity>
  );
};

const color = StyleSheet.create({
  opcion: {
    backgroundColor: '#cdcdcd',
  },
  operacion: {
    backgroundColor: '#FF9427',
  },
  numero: {
    backgroundColor: '#535353',
  },
});

const colorTexto = StyleSheet.create({
  opcion: {
    color: 'black',
  },
  operacion: {
    color: 'white',
  },
  numero: {
    color: 'white',
  },
});

const btnTamano = StyleSheet.create({
  simple: {
    width: 80,
  },
  doble: {
    width: 180,
  },
});
