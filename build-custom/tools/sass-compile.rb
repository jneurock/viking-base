require 'gem-sass.jar'
require 'rubygems'
require 'sass'
require 'sass/exec'

defaultCss = ARGV[0]
css = ARGV[1]
src = ARGV[2]
dest = ARGV[3]

Sass.load_paths << defaultCss
Sass.load_paths << css

opts = Sass::Exec::Sass.new([src, dest])
opts.parse