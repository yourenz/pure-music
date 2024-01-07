use tauri::{AppHandle, Manager};

pub fn pre() {
    tauri_plugin_deep_link::prepare("com.yourenz.pure-music");
}

pub fn init(app: AppHandle) {
    let tauri_app = app.clone();
    tauri_plugin_deep_link::register("pure-music", move |request| {
        tauri_app.emit_all("pure-music-received", request).unwrap();
    })
    .unwrap();
}
