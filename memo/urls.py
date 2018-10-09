from django.urls import path
from memo import views

app_name='memo'
urlpatterns = [
    path('',views.index,name = 'index'),
    path('update/<int:id>',views.update,name='update'),
    path('archive/',views.archive,name='archive')
]