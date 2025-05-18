Projeto:
foi utilizado fastify, zod, vitest para os testes unitarios. 


Rotas 
 User
   Post: criar usuario
   Get: buscar um usuario por id e também todos os usuarios
   put: ediitar o usuario
   delete: deletar o usuario 
Establishment
   Post: criar establishment, só pode criar sendo um usuario tipo owner
   Post: buscar o establishment pelo type, sendo que a rota get não aceita campos body
   Get: buscar um establishment por id e também todos os establishments
   put: ediitar o establishment
   delete: deletar o establishment
Product
   Post: criar product
   Get: buscar um product por id e também todos os products
   put: ediitar o product
   delete: deletar o product
EstablishmentsRules
   Post: criar establishmentRule
   Get: buscar um establishmentRule por id e também todos os establishmentRule
   put: ediitar o establishmentRule
   delete: deletar o establishmentRule


