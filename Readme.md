<center><img src="./src/assets/logo.png"/></center>
<br>
O aplicativo se propõe a resolver um problema que muitos pacientes do SUS enfrentam, que é a
falta de informações sobre a disponibilidade dos remédios que são fornecidos gratuitamente.
Esses remédios são resgatados nos postos de saúde, porém a única forma de descobrir se existem
no estoque é indo em um desses estabelecimentos, o que torna difícil a obtenção desses produtos,
por conta do deslocamento da pessoa junto da incerteza sobre a disponibilidade. O aplicativo oferece
informações sobre os remédios que estão em estoque em cada posto, ajudando o usuário a ter
certeza de onde retirá-los.
<br><br>

### ⚙️ Funcionalidades :
- <strong>Login de administrador e paciente beneficiário do SUS: </strong> 
O público beneficiário do SUS poderá fazer um cadastro no app e ter acesso às informações de medicação nos postos
de saúde da sua localidade e região. Os profissionais da saúde responsáveis pela farmácia
dos postos públicos  tem um cadastro diferencial como administrador responsável pelo cadastro da disponibilidade de medicamentos no posto de saúde onde trabalha.
- <strong>Busca pela medicação:</strong> Os pacientes beneficiários do SUS tem acesso a informação da medicação buscando o nome do remédio no app .
- <strong>Cadastro de medicação:</strong> Os profissionais da saúde responsáveis pela medicação recebida nos postos públicos terão acesso ao cadastro de medicação no app, sendo estes os mesmos responsáveis pela atualização do sistema quanto às informações de entrada e saída de medicação e previsão de chegada de remédios caso o posto tenha ausência da medicação buscada.
- <strong>Mapa com o endereço do posto de saúde:</strong> O sistema contará com um mapa que auxilia o usuário na busca do posto público de saúde na região, localizando o usuário em um mapa
digital.
<br><br>

### 🛠 Tecnologias :
- React native
- mongoDB
- Expresss
- Styled components
- Google Maps
- Geolocation
- Heroku
<br><br>

### ▶️ Executando a aplicação
Conecte seu celular ou emulador em seu computador ou notebook e tenha certeza que o GPS esteja ativo. Execute os seguintes comandos

```npm i ```<br>
```npm run android ```

A aplicação foi criada com intuito de simular ao máximo possível como funcionaria em um ambiente real, por questão de desempenho o banco de dados de remedios do Gsaude é limitado até o momento em 10 remédios na qual simula a base de dados dos medicamentos oferecidos gratuitamente pelo SUS. O funcionário de cada posto só terá possibilidade de relatar e cadastrar a disponibilidade desses 10 medicamentos: 

- Torsilax
- Predsim
- Rivotril
- Dramin B6
- Nifedipina
- Doril
- Anador
- Flanax
- Neosaldina
- Tadalafila

Postos de saúde disponível:
- Ivana de Souza Paes
- Dr. Gilmário Mourão Teixeira
- César Cals de Oliveira Filho
- Dr. Antônio Ciríaco de Holanda Neto (UAPS Parangaba)
- Dr. Ocelo Pinheiro
- Abel Pinto
- Gothardo Peixoto Figueiredo Lima
- Prof. José Valdevino de Carvalho
- Santa Liduína
- Francisco Pereira de Almeida
