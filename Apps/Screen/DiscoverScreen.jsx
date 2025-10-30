import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

export default function DiscoverScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [categories] = useState(['All-Articles', 'Nutrition', 'Exercises', 'Symptoms']);
  const [selectedCategory, setSelectedCategory] = useState('All-Articles');
  const [translateToSinhala, setTranslateToSinhala] = useState(false);
  const [translatedArticles, setTranslatedArticles] = useState({});
  const db = getFirestore(app);
  const { width } = useWindowDimensions();

  // Hard-coded translations for categories
  const categoryTranslations = {
    'All-Articles': 'සියලු ලිපි',
    'Nutrition': 'සෞඛ්‍යය',
    'Exercises': 'ව්‍යායාම',
    'Symptoms': 'රෝග',
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'articles'));
      const articlesArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articlesArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles: ', error);
      setLoading(false);
    }
  };

  const toggleExpandArticle = (id) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  const handleBackArrowPress = () => {
    setExpandedArticle(null);
    setTranslateToSinhala(false); // Reset translation state when going back
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredArticles = articles.filter(article =>
    selectedCategory === 'All-Articles' || article.category === selectedCategory
  );

  const translateText = async (text, targetLang) => {
    try {
      const subscriptionKey = '71cc81d77560489489152b1b7ec074ed';
      const endpoint = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';

      const response = await axios.post(endpoint, [{ text: text }], {
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Region': 'swedencentral',
        },
        params: {
          'to': targetLang,
        }
      });

      return response.data[0].translations[0].text;
    } catch (error) {
      console.error('Translation error:', error.message);
      return text; // Fallback to original text
    }
  };

  const translateArticleData = async (article) => {
    try {
      const translatedTitle = await translateText(article.title, 'si');
      const translatedDesc = await translateText(article.desc, 'si');
      return {
        ...article,
        title: translatedTitle,
        desc: translatedDesc,
      };
    } catch (error) {
      console.error('Error translating article:', error.message);
      return article; // Fallback to original article if translation fails
    }
  };

  const handleArticlePress = async (article) => {
    if (expandedArticle === article.id) {
      setExpandedArticle(null);
      return;
    }

    setExpandedArticle(article.id);
    setTranslateToSinhala(false); // Reset translation state when a new article is expanded
  };

  const handleTranslatePress = async () => {
    if (expandedArticle !== null) {
      const currentArticle = articles.find(article => article.id === expandedArticle);
      if (currentArticle && !translatedArticles[expandedArticle]) {
        const translatedData = await translateArticleData(currentArticle);
        setTranslatedArticles(prev => ({ ...prev, [expandedArticle]: translatedData }));
      }
      setTranslateToSinhala(prev => !prev); // Toggle translation state
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/84/a8/1d/84a81db7fae81f0db04554ea694ff796.jpg' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.container}>
          {expandedArticle && (
            <TouchableOpacity style={styles.backButton} onPress={handleBackArrowPress}>
              <Icon name="arrow-back" size={30} color="#000" />
              <Text style={styles.backButtonText}>
                {translateToSinhala ? 'ආපසු' : 'Back'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Category Selection */}
          <View style={styles.categoryContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.categoryButton, selectedCategory === category && styles.selectedCategoryButton]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
                  {translateToSinhala ? categoryTranslations[category] : category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Articles */}
          {filteredArticles.map(article => {
            const isExpanded = expandedArticle === article.id;
            const displayedArticle = isExpanded && translateToSinhala && translatedArticles[article.id] ? translatedArticles[article.id] : article;

            return (
              <View key={article.id} style={styles.articleCard}>
                <TouchableOpacity onPress={() => handleArticlePress(article)}>
                  <Text style={styles.articleTitle}>
                    {displayedArticle.title}
                  </Text>
                  <Image
                    source={{ uri: displayedArticle.image }}
                    style={styles.articleImage}
                  />
                </TouchableOpacity>
                {isExpanded && (
                  <View style={styles.articleContent}>
                    <RenderHTML
                      contentWidth={width}
                      source={{ html: displayedArticle.desc }}
                    />
                  </View>
                )}

                {/* Floating Translate Button inside the article card */}
                {isExpanded && (
                  <TouchableOpacity
                    style={styles.translateButton}
                    onPress={handleTranslatePress}
                  >
                    <Icon name="globe-outline" size={30} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    
  },
  container: {
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleCard: {
    backgroundColor: '#ffe4e1',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: 'relative', 
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  articleContent: {
    marginTop: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 18,
    color: '#000',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingTop: 20,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedCategoryButton: {
    backgroundColor: '#ffcccb',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  translateButton: {
    position: 'absolute',
    bottom: 10, 
    right: 10, 
    backgroundColor: '#333',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
  },
});
