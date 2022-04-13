from django.http import HttpResponse


def send_the_homepage(request):
    homepage = open('build/index.html').read()
    return HttpResponse(homepage)
