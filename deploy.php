<?php

namespace Deployer;

require 'recipe/common.php';

// Config

set('repository', 'git@github.com:Kehet/start-kehet-com.git');

// Hosts

host('65.109.3.33')
    ->set('remote_user', 'deployer')
    ->set('deploy_path', '/var/www/start-kehet-com');

// Tasks

desc('Execute npm run build');
task('npm:build', function () {
    run('cd {{release_path}} && source ~/.nvm/nvm.sh && npm ci && npm run build');
});

task('deploy', [
    'deploy:prepare',
    'deploy:publish',
]);

// Hooks

after('deploy:failed', 'deploy:unlock');
after('deploy:update_code', 'npm:build');
