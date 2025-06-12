import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function App() {
  const [valorConta, setValorConta] = useState('');
  const [numeroPessoas, setNumeroPessoas] = useState('');
  const [percentualGorjeta, setPercentualGorjeta] = useState('');
  const [valorPorPessoa, setValorPorPessoa] = useState(null);

  const calcularDivisao = () => {
    const valor = parseFloat(valorConta);
    const pessoas = parseInt(numeroPessoas);
    const gorjeta = parseFloat(percentualGorjeta) || 0;

    if (isNaN(valor) || isNaN(pessoas) || pessoas <= 0) {
      setValorPorPessoa(null);
      return;
    }

    const total = valor + (valor * gorjeta / 100);
    const individual = total / pessoas;
    setValorPorPessoa(individual.toFixed(2));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.titulo}>DivApp</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Valor total da conta"
            keyboardType="numeric"
            value={valorConta}
            onChangeText={setValorConta}
          />
          <TextInput
            style={styles.input}
            placeholder="Número de pessoas"
            keyboardType="numeric"
            value={numeroPessoas}
            onChangeText={setNumeroPessoas}
          />
          <TextInput
            style={styles.input}
            placeholder="Gorjeta (%) - opcional"
            keyboardType="numeric"
            value={percentualGorjeta}
            onChangeText={setPercentualGorjeta}
          />

          <View style={styles.botao}>
            <Button title="Calcular" onPress={calcularDivisao} color="#1e88e5" />
          </View>

          {valorPorPessoa && (
            <Text style={styles.resultado}>
              Cada pessoa deve pagar: <Text style={styles.valor}>R$ {valorPorPessoa}</Text>
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f5',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e3a5f',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cfd8dc',
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  botao: {
    marginBottom: 20,
  },
  resultado: {
    fontSize: 18,
    color: '#2c3e50',
    textAlign: 'center',
    fontWeight: '500',
  },
  valor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e88e5',
  },
});
