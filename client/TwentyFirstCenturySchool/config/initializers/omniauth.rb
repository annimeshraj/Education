Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, '1063070493764346', '2e301c6b46064f06da61cb8171339876'
end