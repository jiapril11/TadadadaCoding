---
title: "Tadadada Coding"
url: "https://www.tadadadacoding.com/"
date: "2023-11 ~ "
cover: "amigo_signal"
images:
  - "amigo_signal"
  - "amigo_signal_02"
  - "amigo_signal_03"
github: "https://github.com/jiapril11/TadadadaCoding"
people: "1명(Frontend-1"
categories:
  - "Next"
  - "Typescript"
description: "개발 및 프로젝트 내용을 게시하는 블로그"
skills:
  - "Next.js"
  - "Javascript"
  - "Typescript"
  - "HTML5"
  - "CSS3"
  - "git"
  - "github"
  - "Figma"
---

## Role

- 회원가입:
  - 사용자 편의성을 고려하여 내용 입력 시 **유효성 결과를 바로 표기**
  - 이메일 중복 확인 및 글자수 유효성 체크 시 `supabase` API 비동기 코드로 인해 한 템포 **늦게 체크**가 되는 **이슈** 발생 → 중복 이메일 체크 시 디바운스를 적용하여 해당 문제 해결
  - 생년월일 입력 시 **각 달의 일 수를 고려하여 셀렉트 박스 컴포넌트 제작**, 입력 후 월 변경 시 해당 월에 없는 일자가 지정되어 있으면 **해당 월의 마지막 일자로 변경되게 작업**
- 헤더:
  - `supabase` 의 onAuthStateChange를 통해 auth 변경 감지하여 `local storage` 및 `zustand` 데이터 관리
- 마이페이지:
  - **선택된 탭들만 쿼리 활성화** 될 수 있게 `Tanstack query`의 enable option 추가
  - `supabase` **range** filter를 이용한 **pagination** 처리
  - 프로필 이미지 업로드 시 `supabase`**에서는 한글 및 특수문자의 파일의 업로드가 제한**되는 점을 고려하여 **uuid로 파일명 변경 후 업로드**
  - 큰 사이즈의 이미지 업로드로 인한 DB 용량 차지와 서버 통신 시 네트워크 비용을 고려하여 `browser-image-compression` 라이브러리 활용해 **용량 제한 및 압축을 통한 최적화**(테스트 이미지 3024*4032, 용량 2.5MB → 480*640, 용량 458KB 로 약 **81.68%** 감소)
  - **이미지 파일** 외 다른 파일이 업로드 되지 않도록 **확장자 제한**
  - 프로필 이미지 변경 시 이전 업로드한 프로필 이미지가 `supabase` storage에 쌓이지 않도록 **기존 이미지 파일 모두 삭제** 후 저장
  - 프로필 이미지 저장시 사용자의 이메일 이용하여 경로 지정 했을 때 **이메일 노출 보안 이슈** → **btoa** 함수를 이용해 encode 처리
- 알림:
  - `supabase`의 **postgres_changes를 통해 실시간 변경을 감지**하여 알림 기능 처리
  - 다중 탭의 화면이 있을 경우 개별 알림으로 인식한 중복 알림 이슈 → `supabase` SQL 문 추가하여 해당 문제 해결
- 동행찾기, 스팟 공유 리스트 페이지
  - `Tanstack query`의 **useInfiniteQuery**를 이용한 **무한 스크롤 기능** 구현
  - 메인 고화질 이미지의 빠른 렌더링을 위해 picture, source 태그 사용하여 브라우저별 avif, webp, png 확장자 순으로 적용**(content download:** png 1.10ms → avif 82μs 약 **92.55% 감소** )