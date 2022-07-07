import React from 'react'
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const PDFView = () => {
  const route = useRoute()
  return (
      <WebView
        source={{uri:`https://www.bulario.com/${route.params?.medicine}/`}}
      />
  )
}

export default PDFView