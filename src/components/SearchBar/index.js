import React from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import {Container, SearchBarView, SearchInput } from "./styles";
import { useEffect } from "react";

const SearchBar = ({searchPhrase, setSearchFilter, shouldCrossIconShow, placeholderPhrase, goToListMedicine}) => {
  
  const renderCrossIcon = () => {
    return (
      <Entypo 
        name="cross" 
        size={30}
        color="#929090"
        style={{ padding: 1 }}
        onPress={() => {
          setSearchFilter('');
        }}
      />
    );
  };

  const renderSearchIcon = () => {
    return (
      <FontAwesome
        name="search"
        size={25}
        color="#929090"
        style={{ marginRight: 3 }}
        onPress={ () => {
          goToListMedicine({searchPhrase});
          }
        }
      />
    );
  };
  useEffect(() => {
    setSearchFilter(searchPhrase);
  }, []);

  return (
      <Container>
          <SearchBarView>
              <SearchInput
                placeholder={placeholderPhrase}
                defaultValue={searchPhrase}
                onChangeText={(text) => setSearchFilter(text)}
                onClear={(text) => setSearchFilter('')}
                returnKeyType="go"
                onSubmitEditing={() => goToListMedicine({searchPhrase})}
              />
              {shouldCrossIconShow ? renderCrossIcon() : renderSearchIcon() }
          </SearchBarView>
      </Container>
    );
};

export default SearchBar;