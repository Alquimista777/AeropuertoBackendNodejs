import{Con}from'./bd-connection';
import{Collection}from'mongodb';
import{Usuario}from'./common/usuario';

 class UsuarioServices{
 
    private db:Collection<Usuario>=Con.db.collection("usuarios");

    login(email:string,pass:string)
    {
       return this.db.findOne({email:email, passwprd:pass});
    }

    signin(usuario:Usuario){
      return  this.db.findOne({email:usuario.email})
        .then(usr=>{
            if(usr=null){
                return this.db.insertOne(usuario)
            }else{
               return Promise.reject("Usuario ya existente");
            }
        })
    }
}
export const usuarioServices= new UsuarioServices();