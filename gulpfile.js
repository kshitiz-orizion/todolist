var gulp = require('gulp');
var serve = require('gulp-serve');
var open = require('gulp-open');
var exec = require('gulp-exec');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var paths = {
 scripts: ['app.js'],
 html: ['index.html'],
 json:['package.json','bower.json'],
  dist: './dist'
};
// gulp.task('abcd', function(){
// 	process.chdir(paths.dist);
//   exec('npm install --save'),function(err,stdout,stderr){
//   	 console.log(stdout);
//     console.log(stderr);
//     cb(err);
//   };
//   exec('bower install --save'),function(err,stdout,stderr){
//   	 console.log(stdout);
//     console.log(stderr);
//     cb(err);
//   }
// });

// gulp.task('build',function(){
//  gulp.src(paths.scripts.concat(paths.html).concat(paths.json))
//  .pipe(gulp.dest(paths.dist));
// });

gulp.task('app', function(){
  var options = {
    uri: 'http://localhost:3000',
  };
  gulp.src('index.html')
  .pipe(open(options));
});

gulp.task('serve',['app'],function (cb) {
  exec('C://MongoDB/bin/mongod.exe', function (err, stdout, stderr) {

    console.log(stdout);
    console.log(stderr);
    cb(err);
   
  });
  exec('nodemon app.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
  
