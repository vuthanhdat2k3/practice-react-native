import { useState } from "react";
import { View, Text, Button,TextInput, Image, ScrollView, StyleSheet, FlatList, SectionList, Platform } from "react-native";

type CatProps = {
  name: String;
}
const Cat = (props: CatProps) =>{
  const [isHungry, setHungry] = useState(true);
  return (
    <View>
      <Text style={{textAlign: "center", marginTop: 100}}>
        I am {props.name} and I am {isHungry ? "hungring" : "full"}!
      </Text>
      <Button 
      onPress={() =>{
        setHungry(false);
      }}
      disabled={!isHungry}
      title={isHungry ? "Give me some food, please!" : "Thank you!"}/>
    </View>
  )
}

const Cafe = () => {
  return (
    <View>
      <Cat name="Munkustrap"/>
      <Cat name="Spot"/>
    </View>
  )
}

const PizzaTranslator = () => {
  const [text, setText] = useState('');
  return(
    <View style={{padding: 10, marginTop: 300}}>
      <TextInput
      style= {{height: 40, padding: 5}}
      placeholder="Type here to translate!"
      onChangeText={newText => setText(newText)}
      defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text
        .split(' ')
        .map(word => word && '🍕')
        .join(' ')}
        </Text>
    </View>
  )
}

const logo = {
  uri : "https://reactnative.dev/img/tiny_logo.png",
  width: 64, 
  height: 64,
};

const App = () => {
  return(
      <ScrollView>
          <Text style={{fontSize: 96}}>Scroll me plz</Text>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Text style={{fontSize: 96}}>If you like</Text>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Text style={{fontSize: 96}}>Scrolling down</Text>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Text style={{fontSize: 96}}>What's the best</Text>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Text style={{fontSize: 96}}>Framework around?</Text>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Image source={logo}/>
          <Text style={{fontSize: 80}}>React Native</Text>
      </ScrollView>
  );
}

const FlatListBasics = () => {
  return(
    <View style={styles.container}>
      <FlatList
      data={[
        {key: 'Devin'},
        {key: 'Dan'},
        {key: 'Dominic'},
        {key: 'Jackson'},
        {key: 'James'},
        {key: 'Joel'},
        {key: 'John'},
        {key: 'Jillian'},
        {key: 'Jimmy'},
        {key: 'Julie'},
      ]}
      renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    marginTop: 50,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'blue',
      },
      default: {
        backgroundColor: 'green',
      }
    })
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const SectionListBasics = () => {
  return (
    <View style={styles.container}>
      <SectionList
      sections= {[
        {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
        {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
      ]}
      renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
      renderSectionHeader={({section}) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
      keyExtractor={item => `basicListEntry-${item}`}
      />
    </View>
  )
}

export default SectionListBasics;
