source "https://rubygems.org"

ruby '>= 2.6.10'

gem "fastlane"

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)

gem "dotenv", "~> 2.8"
gem "pry", "~> 0.14.2"
gem "fastlane-plugin-sentry"
gem 'cocoapods', '>= 1.11.3'
