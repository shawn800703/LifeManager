"""lifemanager URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from memorf import views as mviews
from limit import views as lview
from sport import views as sview
from on_accountapi import views as oaview

# Router
router = DefaultRouter()

router.register(r'memorf',mviews.MemorfViewSet)
#limit
router.register(r'user',lview.UserViewSet)
router.register(r'userrole',lview.UserRoleViewSet)
#sport
router.register(r'sportitem',sview.SportItemViewSet)
router.register(r'sportrecord',sview.SportRecordViewSet)
# on_accountapi
router.register(r'on_accountapi',oaview.On_AccountapiViewSet)

# URL
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', include('home.urls')),
    path('memo/', include('memo.urls')),
    path('limit/',include('limit.urls')),
    path('sport/',include('sport.urls')),
    path('on_account/', include('on_account.urls')),
]
