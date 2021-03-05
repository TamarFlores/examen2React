import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight } from 'react-native';

import Request from '../server/Request.js';
import { UPDATE_TAREA_DONE} from '../server/EndPoints.js';

class ToDo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            done: this.props.done
        }
    }
// Realizar Cambio de estado de las tareas
    cambioEstado(id){
        var request = new Request('put', UPDATE_TAREA_DONE + '/' + id, {}, (response) => {
          if(response.status == 200){
            this.setState({
              done: true
            })
          }
        });
        request.start();
    }

    render(){
        const fecha = new Date(this.props.date).toLocaleDateString();
        return (
            <View style={styles.tarea}>
                <Text style={styles.textoHora}>{this.props.hour}</Text>

                <View>
                    <Text style={this.state.done ? styles.tituloTareaCompletado : styles.tituloTarea}>{this.props.name}</Text>
                    <Text style={styles.textoDescripcion}>{this.props.description}</Text>
                    <Text style={styles.textoFecha}>{fecha}</Text>
                </View>
                <View>
                    <TouchableHighlight style={this.state.done? styles.btnCambiarEstadoDisabled : styles.btnCambiarEstado} 
                                    onPress={() => this.cambioEstado(this.props.id)} 
                                    disabled={this.state.done}>
                        <Text style={styles.textoBtnCambiarEstado}>COMPLET</Text>
                    </TouchableHighlight>
                </View>
            
             </View>
        );
    }
}

const styles = StyleSheet.create({
    tarea: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 6
    },
    tituloTarea: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#2E4053'
    },
    tituloTareaCompletado: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#2E4053',
        textDecorationLine: 'line-through'
    },
    textoHora: {
        color: '#B2BABB',
        fontSize: 16
    },
    textoDescripcion: {
        color: '#B2BABB',
        fontSize: 16,
        fontWeight: 'bold'
    },
    textoFecha: {
        color: '#B2BABB',
        fontSize: 13,
    },
    btnCambiarEstado: {
        backgroundColor: 'cornflowerblue',
        padding: 9,
        borderRadius: 7
    },
    btnCambiarEstadoDisabled: {
        backgroundColor: '#7F8C8D',
        padding: 9,
        borderRadius: 7
    },
    textoBtnCambiarEstado: {
        color: 'white'
    }
});

export default ToDo;
