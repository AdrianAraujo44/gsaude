import React from 'react'

import {
  Container,
  Text
} from './styles'

const Badge = ({name, type}) => {
  switch(type) {
    case "available":
      return (
        <Container backgroundColor={'#E0FFEE'} borderColor={'#00B954'} width={'150px'}>
          <Text color={'#00B954'}>{name}</Text>
        </Container>
      )
    case "missing":
      return (
        <Container backgroundColor={'rgba(255,47,47,0.08)'} borderColor={'#FF2F2F'} width={'60px'}>
          <Text color={'#FF2F2F'}>{name}</Text>
        </Container>
      )
    case "coming":
      return (
        <Container backgroundColor={'rgba(191,194,0,0.1)'} borderColor={'#BFC200'} width={'140px'}>
          <Text color={'#BFC200'}>{name}</Text>
        </Container>
      )
  }
    
}

export default Badge