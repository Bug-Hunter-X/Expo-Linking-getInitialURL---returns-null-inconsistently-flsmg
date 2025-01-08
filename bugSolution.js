```javascript
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';

function App() {
  const [initialUrl, setInitialUrl] = useState(null);

  useEffect(() => {
    const getInitialUrlAsync = async () => {
      let url = await Linking.getInitialURL();
      if (url) {
        setInitialUrl(url);
      } else {
          setTimeout(async() => {
            url = await Linking.getInitialURL();
            if(url){
              setInitialUrl(url);
            }
          }, 2000);
      }
    };
    getInitialUrlAsync();

    const handleUrlChange = ({url}) => {
      if(url) setInitialUrl(url);
    }
    Linking.addEventListener('url', handleUrlChange);

    return () => {
      Linking.removeEventListener('url', handleUrlChange);
    };
  }, []);

  return (
    <View>
      {initialUrl ? (
        <Text>Initial URL: {initialUrl}</Text>
      ) : (
        <Text>No initial URL found</Text>
      )}
    </View>
  );
}

```