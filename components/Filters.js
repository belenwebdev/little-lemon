import * as React from 'react';
import { View, ScrollView, StyleSheet, Pressable, Text } from 'react-native';

const Filters = ({filters, onChange, activeFilters}) => {

    return (
        <ScrollView horizontal={true} style={styles.container}>
            {filters.map((filter,index)=>{
                return <Pressable
                        style={{...styles.buttonSelected, backgroundColor: !!activeFilters[index] ? '#F4CE14' : '#e3e3e3' }}
                        key={filter}
                        onPress={()=>{onChange(index)}}>
                    <Text style={styles.buttonText}>{filter}</Text>
                </Pressable>
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        marginRight:10,
        marginLeft: 10,
        marginTop: 10,
    },
    button:{
        margin: 5,
        borderRadius:10,
        height:40,
    },
    buttonSelected:{
        margin: 5,
        borderRadius:10,
    },
    buttonText: {
        fontWeight: 'bold',
        padding:10,
        color: '#51614a',
        textTransform: 'capitalize',
    }
});
export default Filters;
