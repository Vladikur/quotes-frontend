import { uploadQuotes } from '../../api/quotes.js'

export default {
  searchQuotes: {
    title: 'Search Quotes',
    placeholder: 'Enter topic or query',
    uploadQuotes: 'Upload new quotes',
    showDuplicates: 'Show possible duplicates',
    strictSearch: 'Literal character search, no AI',
    total: 'Quotes found:',
    hintTitle: 'Hint',
    hintText1: 'Search is powered by artificial intelligence: it understands the meaning of your query and finds semantically similar quotes, even if the exact words do not match.',
    hintText2: 'You can experiment with your query wording — for example, search for quotes by meeting topic, by synonyms, by author, and more.',
    hintText3: 'Results are sorted by relevance, with the most relevant matches shown first.',
    hintText4: 'Search supports input in both Russian and English.',
    empty: 'No results found',
  },
  bulkUpload: {
    title: 'Add new quotes',
    hint: 'Paste a JSON array of quote objects',
    upload: 'Upload',
  },
  editQuote: {
    title: 'Edit quote',
    update: 'Update',
  },
  login: {
    title: 'Login',
    loginPlaceholder: 'Username',
    passwordPlaceholder: 'Password',
    submit: 'Sign In',
  },
  notFound: {
    title: 'Page not found',
    goHome: 'Go to home',
  },
  header: {
    logOut: 'Logout',
  },
  errors: {
    deleteQuoteFailed: 'Failed to delete quote',
    loadQuotesFailed: 'Failed to load quotes',
    unknown: 'An error occurred',
    invalidJson: 'Invalid JSON. Please check the syntax',
    jsonArrayExpected: 'A JSON array of objects is expected',
    requiredFieldInvalid: 'is required and must be a string',
    loginFailed: 'Invalid username or password',
  },
  success: {
    deleteQuoteSuccess: 'Quote successfully deleted',
    loginSuccess: 'Login successful',
  },
  actions: {
    delete: 'Delete',
    cancel: 'Cancel',
  },
  confirm: {
    deleteQuote: 'Are you sure you want to delete this quote?',
  },
  titles: {
    login: 'login',
    search: 'Quote search',
    notFound: 'Page not found',
    editQuote: 'Edit quote',
    addQuotes: 'Add quotes',
  },
}
