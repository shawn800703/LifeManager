from django.urls import path
from memo import views

app_name='memo'
urlpatterns = [
    path('',views.index,name = 'index'),
    path('delete/<int:id>',views.delete,name='delete'),
    path('update/<int:id>',views.update,name='update'),
    path('search/',views.search,name='search'),
]