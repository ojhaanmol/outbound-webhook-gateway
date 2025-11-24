# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-25

### Added

- Post hook/\<serviceName>
    
    responsible for forwarding registerd services to the designated addresses.

- Post register/\<serviceName>

    responsible for registerning serviceName for a webhook. 

    Required:
    1. \<url> needs to be added in json body.
    2. \<Basic Authorization>