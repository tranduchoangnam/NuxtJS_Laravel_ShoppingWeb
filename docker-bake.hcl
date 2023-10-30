


target "api" {
    context = "api"
    dockerfile = "../dockerfiles/api.Dockerfile"
 
}

target "web" {
    context = "web"
    dockerfile = "../dockerfiles/web.Dockerfile"
 
}

