use actix_files::Files;
use actix_web::{middleware, web, App, HttpServer};
use std::sync::Mutex;
use tauri::AppHandle;

struct TauriAppState {
    #[allow(dead_code)]
    app: Mutex<AppHandle>,
}

#[actix_web::main]
pub async fn init(app: AppHandle) -> std::io::Result<()> {
    let tauri_app = web::Data::new(TauriAppState {
        app: Mutex::new(app),
    });
    HttpServer::new(move || {
        App::new()
            .app_data(tauri_app.clone())
            .wrap(middleware::Logger::default())
            .service(Files::new("/callback", "./public/").index_file("callback.html"))
    })
    .bind(("127.0.0.1", 58944))?
    .run()
    .await
}
