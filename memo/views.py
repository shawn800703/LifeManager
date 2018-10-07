from django.shortcuts import render,redirect
from memorf.models import Memorf
from django.db.models import F
import datetime

# Create your views here.
def index(request):
    # asc(nulls_last=True)
    memot = Memorf.objects.filter(memoState='t').order_by(F('expiredate').asc(nulls_last=True))
    memod = Memorf.objects.filter(memoState='d').order_by(F('expiredate').asc(nulls_last=True))
    memof = Memorf.objects.filter(memoState='f').order_by(F('expiredate').asc(nulls_last=True))
    # today = datetime.date.today()

    if request.method == 'POST':
        memoTitle = request.POST['memoTitle']
        memoContent = request.POST['memoContent']
        expiredate = None
        if request.POST['expiredate']:
            expiredate = request.POST['expiredate']

        Memorf.objects.create(memoTitle=memoTitle,memoContent=memoContent,expiredate=expiredate,memoState='t')
        return redirect('/memo')

    return render(request,'memo/index.html',locals())

def update(request,id):
    memo = Memorf.objects.get(memoID=id)
    memo.memoTitle = request.POST['memoTitle']
    memo.memoContent = request.POST['memoContent']
    memo.memoState = request.POST['memoState']
    
    if request.POST['expiredate']:
        memo.expiredate = request.POST['expiredate']

    memo.save()
    return redirect('/memo')

def delete(request,id):
    memo = Memorf.objects.get(memoID=id)
    memo.delete()
    return redirect('/memo')

def search(request):
    keyword = request.GET('keyword')
    memos = Memorf.objects.filter(memoTitle__contains=keyword)
    print(memos)