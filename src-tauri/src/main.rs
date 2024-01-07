// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod plugins;
mod server;
use std::thread;

fn main() {
    plugins::deep_link::pre();
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            plugins::deep_link::init(handle.clone());

            let boxed_handle = Box::new(handle);
            thread::spawn(move || {
                server::init(*boxed_handle).unwrap();
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
