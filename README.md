![logo](https://github.com/datajcthemax/pdfinal/assets/128767460/3acd3b2c-9e15-483b-a220-ad136c1e76df)

- **소개:** 빅데이터 24기 3조가 열심히 준비한 파이널 프로젝트로 미국 S&P500에 상장 되어있는 회사들의 최근 주가 정보, 제무재표, 주식차트, 관련기사를 볼수 있는 웹 어플리케이션.
- **사용된 스택**: 
	- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next-dot-js&logoColor=white)
	- ![AWS Amplify Hosting](https://img.shields.io/badge/AWS%20Amplify-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
	- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
	- ![Airflow](https://img.shields.io/badge/Airflow-017CEE?style=for-the-badge&logo=apache-airflow&logoColor=white)
	- ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
	- ![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

- **아키텍처**:
![Pasted image 20230916074446](https://github.com/datajcthemax/pdfinal/assets/128767460/f8dd75ae-edf2-43b3-bf88-26fff3986485)

	- [[yfinance]]라이브러리를 통해서 주식정보, 회사정보, 제무재표를 가져와서 MySQL 데이터베이스에 저장
	- Airflow전용 [[EC2]] 인스턴스를 통해서 주식정보는 매일 오전 9시, 제무재표 및 회사정보는 매년 12월 31일에 yfinance->MySQL 작업을 자동화
	- 프론트엔드와 백엔드코드는 리액트기반 풀스택 웹 프레임워크인 [[Next.js]] 버전 13으로 빌드
	- 넥스트로 빌드된 [[SPA]]를 [[AWS Amplify Hosting]] 서비스를 통해 [[지속적 배포]].
