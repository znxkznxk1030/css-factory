
  
[가상 요소(](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)[pseudo-element)](https://developer.mozilla.org/ko/docs/Web/CSS/pseudo-classes)인 **::after** 를 이용해서 밑줄을 그어봅시다.

### **가상요소(pseudo-element)**란?

선택자에 추가하는 키워드로, 선택자의 **특정 부분**만 스타일 하기위해 사용합니다.

비슷한 요소로 _**가상클래스(pseudo-classes)**_는 선택자의 **특정 상태**에 스타일 하기위해 사용합니다. 

CSS3부터는 가상클래스는 **:로(:hover, :active, 등)** 시작하고, 가상요소는 **::로(::after, ::before, 등)** 구분해요.

_\* CSS2까지는 **:after**로 사용했지만 CSS3부터는 **::after**로 사용하길 권장합니다. _

## 1\. 밑줄 생성

#### **::before와 ::after 가상요소의 기본위치**


![::before ::after](https://blog.kakaocdn.net/dn/tD13j/btq4H114hfB/RNgSCUpRMx0kyfwCUjVRS1/img.png)

**::after** 가상요소를 사용해서 밑줄로 만들어봅시다.

#### **1\. 생성하기**

::after가상요소를 만들기 위해서는 content값이 필수로 필요합니다.

하지만 내부는 아무것도 없는 빈 박스만 필요해서 **content:"";**로 지정했습니다.

#### **2\. 위치 지정하기**

가상요소의 위치를 컨텐츠의 아래로 보내기 위해서 position을 absolute로 지정합니다.

여기서 중요한 점은 **absolute의 중요한 조건은 부모중 position이 static이 아닌 부모를 기준으로 위치를 설정한다는 점**입니다. 설정하지 않은 position은 모두 static이기 때문에 기준이 되는 부모의 position을 static이 아닌 속성으로 변경해주어야 합니다. 밑줄의 기준이 되는 컨텐츠의 **position을 relative**로 설정했습니다.

그러고, 기준으로부터 왼쪽으로는 0px, 아래로는 -2px을 주어 위치를 지정했습니다.

#### **3\. 크기 조절 & 색상지정**

높이는 2px로 지정하고, 넓이는 임시로 100px로 지정해두었습니다.

그리고 마지막으로 background-color를 빨간색(red)으로 설정해두면 기본적인 형태의 밑줄이 완성이 됩니다.


## 2\. 애니메이션 만들기

**hover됐을 때, 왼쪽에서 오른쪽으로 생성되는 애니메이션을 넣어봅시다.**

#### **1\. 전/후 상태에 따른 스타일**

hover 아닐 때 : 밑줄 X

( **scaleX**속성을 0으로 만들어 밑줄을 없앴어요. )

```
.content::after {
	transform: scaleX(0);
}
```

hover 일 때 :밑줄 O

```
.content:hover::after {
	transform: scaleX(1);
}
```

#### **2\. Transition 적용**

transition속성을 이용해서 자연스러운 애니메이션을 구현해봅시다

**scaleX가 0에서 1이되는 transform이 500ms동안 일정하게 진행되도록 만들어봤습니다.**

```
.content::after {
	transition: transform 500ms ease;
}
```

#### **3\. Transform 기준 정하기**

transform의 기본설정으로는 밑줄은 가운데서부터 양쪽으로 ( **<- ->** ) 만들어지게 돼요.

이를 **transform-origin: left** 속성을 추가하여 기준을 왼쪽으로 두어 **\->**방향으로 밑줄이 그어지도록 합시다.

```
.content::after {
	transform-origin: left;
}
```

#### **4\. (optional) 모바일 유저 배려하기**

마우스가 없는 모바일에서는 hover상태의 이벤트는 혼란을 야기할 수 있어요.

**@media 쿼리의 hover 속성**을 사용하면, hover상태가 가능한 디바이스에서만 스타일을 적용 할 수 있어요.

모바일 유저를 배려하기 위해, hover가 가능할때 애니메이션이 작동하도록 바꿔봅시다!

```
@media (hover) {
  .content:hover::after {
    transform: scaleX(1);
  }

  .content::after {
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 500ms ease;
  }
}
```


여기까지 따라오셨다면, 부드러운 애니메이션이 있는 밑줄긋기 완성이 되었어요!

긴글 읽어주셔서 감사합니다 :)